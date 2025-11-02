const con = require("../db")

exports.availabilityMiddleware = (req, res, next) => {

    let available = false

    // pour verifier si un livre est disponible
    sql_availble= "SELECT available FROM books WHERE id = ?"
    
    // Change la disponibilité d'un livre 
    sql_change_dispo= "UPDATE books SET available = 0 WHERE id = ?"


    if (req.method === "POST"){

        // Lors de la création d'un Userbook
        // Il faut savoir si le livre est disponible
        // Si il est disponible, on peut l'emprunter
        // le rendant maintenant indisponible

        const book_id = req.body.book_id
        
        if (!book_id) 
            return res.status(400).json({message: "Bad Request(No ID)"})
    
        con.query(sql_availble, book_id, (err,result) => {
    
            if (result.length === 0)
                return res.status(404).json({message: "Book not Found"})
    
            if (err) 
                return res.json({message: err.message});
    
            if (result[0].available === 1)
                available = true
                
            if (available){
                
                con.query(sql_change_dispo, book_id, (err,result) =>{
                    if (err)
                        return res.json({message: err.message});

                    next()
                })
                
            } 
            else
                return res.status(406).json({message: "This book is not yet available"})
        })
    }
        
    else if (req.method === "DELETE"){
        // Pour supprimer un livre,
        // il faut vérifier si le livre est rendu
        const id = req.params.id
        
        con.query(sql_availble, id, (err,result) => {

            if (err) 
                return res.json({message: err.message});

            if (result.length === 0)
                return res.status(404).json({message: "Book not Found"})

            if (result[0].available === 0){
                console.log(result[0].available)
                return res.status(406).json({message: "This book was not yet returned."})      
            }
            
        next()
    })
    }
}