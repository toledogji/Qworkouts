const BaseRepository = require('./base.repository');
let _user = null;

class UserRepository extends BaseRepository{
    constructor({ UserModel }){
        super(UserModel);
        _user = UserModel;
    }

    async getUserByUsername(username){
        return await _user.findOne({ username });
    }

    async update(id, entity){
        return await this.model.findByIdAndUpdate(id, {name: entity.name, usernmae: entity.username}, { new: true });
    }
}

module.exports = UserRepository;