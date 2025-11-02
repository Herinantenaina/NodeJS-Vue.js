const con = require("../db");

exports.createBook = async (req,res) => {
    const { title, author, available } = req.body;
    sql= "INSERT INTO books (title, author, available) VALUES (?, ?, ?)";

    if (!title || !author || !available)
        return res.status(400).json({message: "Bad request"});

    con.query(sql, [title, author, available], function (err, ){
        if (err)
            return res.status(500).json({message: err.message});
        
        res.status(201).json({message: "New book added "});
    });
    
}

exports.getAllBooks = async (req,res) => {
    con.query("SELECT * FROM books", (err, result) => {

        if (err)
            return res.status(500).json({ error: err.message });
        
        if(result.length === 0)
            return res.status(404).json({message: "There is no more books"})
        
        res.status(200).json(result);
    });
}


exports.getBook = (req,res) => {
    const id = req.params.id;
    sql = "SELECT * FROM books WHERE id = ?";

    if (!id)
        return res.status(400).json({message: "Bad request(missing ID)"});

    con.query(sql,id, (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.length === 0)
            return res.status(404).json({message: "Book not found"})

        res.status(200).json({result})
    })
}

exports.updateBook = (req,res) => {
    const id = req.params.id;
    const { title, author, available } = req.body;
    sql = "UPDATE books SET title = ?, author = ?, available = ? WHERE id = ?";
    
    if (!id || !title || !author || !available)
        return res.status(400).json({message: "Bad request"});


    con.query(sql,[title,author,available,id], (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0)
            return res.status(404).json({message: "Book Not Found"})
        
        res.status(201).json({message: "Book: "+title+"'s informationa have been updated"});
    })
}

exports.deleteBook = (req,res) => {
    const id = req.params.id;
    sql = "DELETE FROM books WHERE id = ?";

    if (!id)
        return res.status(500).json({ error: err.message });


    con.query(sql,id, (err,result) =>{

        if (err)
            return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0)
            return res.status(404).json({message: "Book Not Found"});

        res.json({message: "A book has been deleted from the database."});
    })
    
}
