class BaseService {

    constructor(repository){
        this.repository = repository;
    }

    async get(id){
        if(!id){
            const error = new Error();
            error.stats = 400;
            error.message = "Id must be sent";
            throw error;
        }

        const currentEntity = this.repository.get(id);

        if(!currentEntity){
            const error = new Error();
            error.stats = 404;
            error.message = "Entity not found";
            throw error;
        }

        return currentEntity;
    }

    async getAll(pageSize, pageNum){
        return await this.repository.getAll(pageSize, pageNum);
    }

    async create(entity){
        return await this.repository.create(entity);
    }

    async update(id, entity){
        if(!id){
            const error = new Error();
            error.stats = 400;
            error.message = "Id must be sent";
            throw error;
        }
        
        return this.repository.update(id, entity);
    }

    async delete(id){
        if(!id){
            const error = new Error();
            error.stats = 400;
            error.message = "Id must be sent";
            throw error;
        }
        
        return this.repository.delete(id);
    }

}

module.exports = BaseService;