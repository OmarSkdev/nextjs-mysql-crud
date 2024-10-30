import { pool } from "@/config/db"

export default async function handler(req,res) {
    //console.log(req.query);
    //return res.status(200).json('Obteniendo producto: '+ req.query.id)
    switch (req.method) {
        case 'GET':
                return await getProduct(req, res)
        case 'DELETE':
            return await deleteProduct(req, res)
        case 'PUT':
            return await updateProduct(req, res)    
        default:
            break;
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query
        const [result] = await pool.query("SELECT * FROM product WHERE id = ?", [id]);
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query
        //throw new Error('No implementado')
        await pool.query('DELETE FROM product WHERE id = ?', [id])
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    
}

const updateProduct = async (req, res) => {
    const { id } = req.query;
    const { name, price, description} = req.body;
    try {
        await pool.query('UPDATE product SET name = ?, price = ?, description =? WHERE id = ?',
            [name, price, description, id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: error.message})       
    }
    
}

    

     
    
