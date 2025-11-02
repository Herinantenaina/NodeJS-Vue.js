const con = require("../db");

exports.createUser = async (req,res) => {
    const { name, password, role } = req.body;
    sql= "INSERT INTO users (name, password, role) VALUES (?, ?, ?)";

    if (!name || !password || !role)
        return res.status(400).json({message: "Missing Field(s)"});
    
    con.query(sql, [name, password, role], function (err,){
        if (err)
            return res.status(500).json({message: err.message});
        
        res.status(201).json({message: "New user added "});
    });
    
}

exports.getAllUsers = async (req,res) => {
    con.query("SELECT * FROM users", (err, result) => {

        if (err)
            return res.status(500).json({ error: err.message });
        
        if (result.length === 0)
            return res.status(404).json({message: "There is no more books"})
        
        res.status(200).json(result);
    });
}


exports.getUser = (req,res) => {
    const id = req.params.id;
    sql = "SELECT * FROM users WHERE id = ?";

    if (!id)
        return res.status(400).json({message: "Bad request(missing ID)"});

    con.query(sql,id, (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.length === 0)
            return res.status(404).json({message: "Not Found"})

        res.status(200).json({result})
    })
}

exports.updateUser = (req,res) => {
    const id = req.params.id;
    const { name, password, role } = req.body;
    sql = "uPDATE users SET name = ?, password = ?, role= ? WHERE id = ?";
    
    if (!id || !name || !password || !role)
        return res.status(400).json({message: "Missing file(s)"});

    con.query(sql,[name,password,role,id], (err,result) =>{
        
        if (err)
            return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0)
            return res.status(404).json({message: "User Not Found"})
        
        res.status(201).json({message: "User: "+name+"'s informations have been updated"});
    })
}

exports.deleteUser = (req,res) => {
    const id = req.params.id;
    sql = "DELETE FROM users WHERE id = ?"

    if (!id)
        return res.status(400).json({ error: "Bad Request(missing ID)" });

    con.query(sql,id, (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0)
            return res.status(404).json({message: "User Not Found"});

        res.json({message: "An User has been deleted from the database."});
    })
}
