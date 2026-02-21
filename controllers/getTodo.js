const Todo = require("../models/Todo");

exports.getTodo = async (req ,res) => {
    try {
        // fetch all todo items from database
        const todos = await Todo.find({});
        res.status(200).json(
            {
                sucess:true,
                data:todos,
                message:"entire Todo data"
            }
        )
        
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:'Server Error'
        })
    }

}

exports.getTodoById = async(req,res) =>{
    try {
        // extract todos by id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        // data for given id not found
        if(!todo){
            return res.status(404).json(
                {
                success:false,
                message:"no data find for given id"
            })
        }
        // data for given id found
        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data fetched successfully`
        })

    } catch (err) {
        console.error(err)
        console.log(err);
        res.status(500).json({        
                success:false,
                error:err.message,
                message:'Server Error'
            })
    }
}