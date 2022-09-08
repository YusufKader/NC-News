const db = require('../db/connection');


  
  exports.fetchTopicBySlug = () =>{
        return db.query("SELECT * FROM topics").then((results) => {
        
        return results.rows
    }) 
     };
  
  
  
  
  
