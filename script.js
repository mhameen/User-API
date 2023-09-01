import express from "express";

const app = express();

const db = {
  users: [],
};

app.use(express.json());

app.get("/users", (req, res) => {
  res.status(200).json({
    data: {
      users: db.users,
    },
  });
});

app.post("/userdetails", (req, res) => {
  const { userId, Name, age, city } = req.body;

  const userdetails = {
    userId,
    Name,
    age,
    city,
  };

  db.users.push(userdetails);

  res.status(201).json({
    data: {
      message: "user Details added succesfully",
    },
  });
});

app.get("/singleUser/:userId", (req, res) => {
  const { userId } = req.params;

  const userdetails = db.users.find(
    (userdetails) => userdetails.userId == userId
  );

  if (userdetails) {
    res.status(201).json(userdetails);
  } else {
    res.status(404).json({
      data: {
        message: "user not found",
      },
    });
  }
});

app.put("/updateUser/:userId", (req, res) => {
  const { userId } = req.params;
  const { Name, age, city } = req.body;
  const userdetails = db.users.find(
    (userdetails) => userdetails.userId == userId
  );
  if (userdetails) {
    userdetails.Name = Name;
    userdetails.age = age;
    userdetails.city = city;
    res.status(201).json({
      message: "user updated succesfully",
    });
  } else {
    res.status(404).json({
      data: {
        message: "user not found",
      },
    });
  }
});

app.delete('/deleteUser/:userId',(req,res)=>{
    const {userId} = req.params;

    const userdetails = db.users.find((userdetails)=>userdetails.userId == userId)

    if(!userdetails){
        res.status(404).json({
            data:{
                message:"user not found"
            },
        });
    };
    const index = db.users.indexOf(userdetails)

    db.users.splice(index,1)

    res.status(200).json({
        data:{
            message:"user deleted"
        },
    });
});

app.listen(3001, () => {
  console.log("The server is running at port number 3001");
});
