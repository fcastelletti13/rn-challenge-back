import config from '../../db-config.js';
import sql from 'mssql';

class PlatoService {
    getAll = async () => {
        let returnArray = null;
        console.log('Estoy en: PlatoService.getAll()');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request().query(`SELECT * FROM Plato`);
            returnArray = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getById = async (id) => {
        let returnEntity = null;
        
        console.log('Estoy en: PlatoService.getById(id)');
        console.log(id)
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query(`
                    SELECT * FROM Plato
                    WHERE Id = @pId
                `);
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    insert = async (plato) => {
        let rowsAffected = 0;
        console.log('Estoy en: PlatoService.insert(plato)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pPlato', sql.NChar , plato?.plato)
                .input('pImage', sql.NChar , plato?.image)
                .query(`
                    INSERT INTO Plato (Plato, Image) 
                    VALUES (@pPlato, @pImage)
                `);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    update = async (plato) => {
        let rowsAffected = 0;
        console.log('Estoy en: PlatoService.update(plato)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pPlato', sql.NChar , plato?.plato)
                .input('pImage', sql.NChar , plato?.image)
                .input('pId', sql.Int , plato?.idPlato)
                .query(`
                    UPDATE Plato SET 
                        Plato = @pPlato, 
                        Image = @pImage
                    WHERE Id=@pId`
                );
            rowsAffected = result.rowsAffected; 
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    delete = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: PlatoService.deleteById(id)');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query(`
                                    DELETE FROM Plato 
                                    WHERE Id = @pId
                                `);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default PlatoService;