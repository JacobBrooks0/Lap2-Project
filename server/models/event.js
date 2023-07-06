const db = require("../database/connect");

class CommunityEvent {
  constructor({
    event_id,
    creator_id,
    name,
    info,
    main_image_url,
    start_date,
    end_date,
  }) {
    this.event_id = event_id
    this.creator_id = creator_id;
    this.name = name;
    this.info = info;
    this.main_image_url = main_image_url;
    this.start_date = start_date;
    this.end_date = end_date;
  }

  static async getAll() {
    const response = await db.query(
      "SELECT * FROM community_event ORDER BY name;"
    );
    if (response.rows.length === 0) {
      throw new Error("No community events are available.");
    }
    return response.rows.map((g) => new CommunityEvent(g));
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM community_event WHERE event_id = $1;",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to find the community event you're looking for.");
    }
    return new CommunityEvent(response.rows[0]);
  }

  static async getCreatedByUserId(id) {
    const response = await db.query(
      "SELECT * FROM community_event WHERE creator_id = $1 ORDER BY name",
      [id]
    );
    if (response.rows.length < 1) {
      throw new Error("You haven't created any community events yet");
    }
    return response.rows.map((record) => new CommunityEvent(record));
  }

  static async getBookmarkedByUserId(id) {
    const response = await db.query(
      "SELECT * FROM community_event ce LEFT JOIN event_bookmarker ea ON ce.event_id = ea.event_id WHERE ea.bookmarker_id = $1;",
      [id]
    );
    if (response.rows.length < 1) {
      throw new Error("You haven't bookmarked any community events yet.");
    }
    return response.rows.map((record) => new CommunityEvent(record));
  }

  static async createCommunityEvent({
    creator_id,
    name,
    main_image_url,
    info,
    start_date,
    end_date,
  }) {
    const values = [
      creator_id,
      name,
      main_image_url,
      info,
      start_date,
      end_date,
    ];
    const response = await db.query(
      "INSERT INTO community_event (creator_id, name, main_image_url, info, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      values
    );
    const event_id = response.rows[0].event_id;
    const newCommunityEvent = await CommunityEvent.getOneById(event_id);
    return newCommunityEvent;
  }

  async deleteCommunityEvent() {
    await db.query(
      "DELETE FROM event_bookmarker WHERE event_id = $1 RETURNING *;",
      [this.event_id]
    );
    const response = await db.query(
      "DELETE FROM community_event WHERE event_id = $1 RETURNING *;",
      [this.event_id]
    );
    // if (response.rows.length != 1) {
    //   throw new Error("Unable to delete community event");
    // }
    return new CommunityEvent(response.rows[0]);
  }

  async bookmarkEvent(userId) {
    const response = await db.query(
      "INSERT INTO event_bookmarker (event_id, bookmarker_id) VALUES ($1, $2) RETURNING *;",
      [this.event_id, userId]
    );
    // if (response.rows.length != 1) {
    //   throw new Error("Unable to confirm your attendance to this event.");
    // }
    return response.rows[0];
  }

  async removeEventBookmark(userId) {
    const response = await db.query(
      "DELETE FROM event_bookmarker WHERE bookmarker_id = $1 AND event_id = $2 RETURNING *;",
      [userId,this.event_id]
    );
    // if (response.rows.length != 1) {
    //   throw new Error(
    //     "Unable to remove your attendance confirmation to this event."
    //   );
    // }
    return response.rows[0];
  }
}

module.exports = CommunityEvent;
