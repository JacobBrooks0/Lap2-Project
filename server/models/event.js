const db = require("../database/connect");

class CommunityEvent {
  constructor({
    creator_id,
    name,
    info,
    main_image_url,
    start_date,
    end_date,
  }) {
    this.id = creator_id;
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

  static async getConfirmedByUserId(id) {
    const response = await db.query(
      "SELECT * FROM community_event ce LEFT JOIN event_attendee ea ON ce.event_id = ea.event_id WHERE ea.attendee_id = $1;",
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
      "INSERT INTO community_event (creator_id, name, main_image_url, info, start_date, end_date, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      values
    );
    const event_id = response.rows[0].event_id;
    const newCommunityEvent = await CommunityEvent.getOneById(event_id);
    return newCommunityEvent;
  }

  async removeCommunityEvent() {
    await db.query(
      "DELETE FROM event_attendee WHERE event_id = $1 RETURNING *;",
      [this.id]
    );
    const response = await db.query(
      "DELETE FROM community_event WHERE event_id = $1 RETURNING *;",
      [this.id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to remove community event");
    }
    return new CommunityEvent(response.rows[0]);
  }

  async confirmAttendance(userId) {
    const response = await db.query(
      "INSERT INTO event_attendee (event_id, attendee_id) VALUES ($1, $2) RETURNING *;",
      [this.id, userId]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to confirm your attendance to this event.");
    }
    return response.rows[0];
  }

  async removeAttendanceConfirmation(userId) {
    const response = await db.query(
      "DELETE FROM event_attendee WHERE attendee_id = $1 RETURNING *;",
      [userId]
    );
    if (response.rows.length != 1) {
      throw new Error(
        "Unable to remove your attendance confirmation to this event."
      );
    }
    return response.rows[0];
  }
}

module.exports = CommunityEvent;
