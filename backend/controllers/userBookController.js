const con = require("../db")

exports.createUserBook = (req,res) => {
    const { user_id, book_id, return_date } = req.body;
    const id = req.params.id

    if (!user_id || !book_id || !return_date)
        return res.status(400).json({message: "Bad request"});

    // Pour la création
    sql= "INSERT INTO userbooks (user_id, book_id, return_date) VALUES (?, ?, ?)";

    con.query(sql, [user_id, book_id, return_date], function (err, result){
        if (err)
            return res.json({message: err.message});
        
        res.status(201).json({message: "UserBook created successfully !"})
    });     
}

exports.getAllUserBooks = (req,res) => {
    con.query("SELECT * FROM userbooks", (err, result) => {

        if(result.length === 0)
            return res.status(404).json({message: "There is no borrowed book"});

        if (err)
            return res.status(500).json({ error: err.message });
        
        res.status(200).json(result);
    });
}

exports.getUserBook = (req,res) => {
    const id = req.params.id;
    sql = "SELECT * FROM userbooks WHERE id = ?";

    if (!id)
        return res.status(400).json({message: "Bad request(missing ID)"});

    con.query(sql,id, (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.length === 0)
            return res.status(404).json({message: "UserBook not found"})

        res.status(200).json({result})
    })
}

exports.updateUserBook = (req,res) => {
    const id = req.params.id;
    const { user_id, book_id, return_date } = req.body;
    sql = "UPDATE userbooks SET user_id = ?, book_id = ?, return_date = ? WHERE id = ?";
    
    if (!id || !user_id || !book_id || !return_date)
        return res.status(400).json({message: "Missing field(s)"});


    con.query(sql,[user_id,book_id,return_date,id], (err,result) =>{

        if (result.affectedRows === 0)
            return res.status(404).json({message: "UserBook Not Found"});
    
        if (err)
            return res.status(500).json({ error: err.message });
        
        res.status(201).json({message: "An userBook's informations have been updated"});
    })
}

exports.deleteUserBook = (req,res) => {
    const id = req.params.id;
    sql = "DELETE FROM userbooks WHERE id = ?";

    if (!id)
        return res.status(400).json({ error: "Bad Request(missing ID)"});

    con.query(sql,id, (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0)
            return res.status(404).json({message: "User Not Found"});

        res.json({message: "An userBook was deleted."});
    });
}