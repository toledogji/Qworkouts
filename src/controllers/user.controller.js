let _userService;

class UserController{

    constructor( { UserService }){
        _userService = UserService;
    }

    async get(req, res){
        const { userId } = req.params;
        const user = await _userService.get(userId);
        return res.send(user);
    }

    async getAll(req, res){
        const users = await _userService.getAll();
        return res.send(users);
    }

    async create(req, res){
        const { body } = req;
        const createdUser = await _userService.create(body);
        return res.status(201).send(createdUser);

    }
    

    async update(req, res){
        const { body } = req;
        const { userId } = req.params;
        const updatedUser = await _userService.update(userId, body);
        return res.send(updatedUser);
    }

    async delete(req, res){
        const { userId } = req.params;
        const deletedUser = await _userService.delete(userId);
        return res.send(deletedUser);
    }
    
}

module.exports = UserController;