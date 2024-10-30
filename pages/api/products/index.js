import { pool } from "../../../config/db";

export default async function handler(req,res) {

    switch(req.method) {
        case 'GET':
            return await obtenerProducts(req,res);
        case 'POST':
            return await guardarProduct(req,res);
    }
}

const obtenerProducts = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM product')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error });
        
    }
   
}

const guardarProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const [result] = await pool.query("INSERT INTO product SET ?", {
            name,
            description,
            price,
        });
        //console.log(result);                     
        return res
            .status(200)
            .json({ name, price, description, id: result.insertId });

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
    
};