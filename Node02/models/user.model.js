const sql = require("../utils/db")

module.exports = {
    all: (status,keyword) => {
        let filter = sql`WHERE name IS NOT NULL`;
        if(status && status!=="all") filter = sql` ${filter} AND status = ${status === "active" ? true : false}`;
        if(keyword) {
            filter = sql`${filter} AND LOWER(email) LIKE ${"%" + keyword.toLowerCase() + "%"}`
        }
        return sql`SELECT * FROM users ${filter}`;
    },
    email: (email, id=0) => {
        const filter = id > 0 ? sql`AND id != ${id}` : sql``;
        if(email) return sql`SELECT email FROM users WHERE email = ${email} ${filter} `
        return [];
    },
    create: (name, email, status) => {
        return sql`
        INSERT INTO users(name,email,status) VALUES 
        (${name}, ${email}, ${status === 1 ? true : false})
        `
    },
    find: (id) => {
        return sql`SELECT * FROM users WHERE id = ${id}`;
    },
    update: (name,email,status,id) => {
        return sql`
        UPDATE users 
        SET name = ${name}, email = ${email}, status = ${status === 1 ? true : false}, update_at = NOW()
        WHERE id = ${id};
        `
    },
    delete: (id) => {
        return sql`
        DELETE FROM users 
        WHERE id = ${id} 
        `
    }

}