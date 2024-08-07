export const checkUserData = "SELECT * FROM users WHERE email = $1";
export const insertUserData = "INSERT INTO users ( email, password, phoneNo,name) VALUES ($1, $2, $3, $4) RETURNING *";
export const addJobs = "INSERT INTO jobs (post,description,url) VALUES ($1,$2,$3)";
export const getAllJob = "SELECT * FROM jobs";
export const filter = " SELECT * FROM jobs WHERE description ILIKE $1";