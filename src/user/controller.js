import db from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkUserData, insertUserData, addJobs, getAllJob, filter} from "./queries.js";
import validateAndCheckURL from "./utils/validateUrl.js";

const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER USERS:
export const registerUsers = async(req,res) => {
    const { name, password, email, phoneNo } = req.body;

    try {
        const checkResult = await db.query(checkUserData, [email]);

        if (checkResult.rows.length > 0) {
            res.status(500).send("User already exists!!");
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    const result = await db.query(
                        insertUserData,
                        [email, hash, phoneNo,name]
                    );
                    res.status(200).json(result.rows);
                }
            })
        }
    } catch (err) {
        res.send(err.message);
    }
};

//LOGIN USERS:
export const loginUsers =  async(req,res) => {
    const { email, password } = req.body;

    try {
      const result = await db.query(checkUserData, [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashPassword = user.password;
  
        bcrypt.compare(password, storedHashPassword, (err, result) => {
          if (err) {
            return res.status(401).send('Invalid password.');
          } else {
            if (result) {
              const token = jwt.sign({ id: user.email, role: user.password }, JWT_SECRET);
              res.status(200).send({ auth: true, token: token });
            }
          }
        })
      }
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Error during login.');
    }
  };



// ADDING JOBS:
export const addJob = async (req, res) => {
  const { postName, description, applyLink } = req.body;

  if (!postName || !description || !applyLink) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const { isValid, message } = await validateAndCheckURL(applyLink);

  if (!isValid) {
    return res.status(400).json({ message });
  }

  db.query(addJobs, [postName, description, applyLink], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to add job post', error });
    }
    res.status(201).send('Job post added successfully!!');
  });
};


// GET-ALL JOBS:
export const getAllJobs = (req,res)=>{
  const result = db.query(getAllJob,(error,results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
  })
} 


// FILTER JOBS:
export const filterJobs = (req,res)=>{
  const { keyword } = req.body;

  if(!keyword){
    return res.status(400).send("Keyword is required!!");
  }

   db.query(filter,[`%${keyword}%`],(error,results)=>{
    if(results.rows.length == 0){
      res.send("No Jobs found.");
    }
    res.status(201).json(results.rows);
  })
}