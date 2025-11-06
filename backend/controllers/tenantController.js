const Tenant = require('../models/Tenant')

exports.getAllTenants= async(req,res)=>{
    const tenants = await Tenant.find();
    res.json(tenants);
};

exports.createTenant = async (req,res) =>{
    try {
        const {name, email, plan, status} = req.body;
        const tenant = new Tenant({
            name, 
            email, 
            plan: plan ,
            status: status 
        });
        await tenant.save();
        res.status(201).json(tenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateTenant = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name, email, plan, status} = req.body;
        const tenant = await Tenant.findByIdAndUpdate(
            id, 
            {name, email, plan, status},
            {new: true}
        );
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json(tenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteTenant = async (req,res)=>{
    await Tenant.findByIdAndDelete(req.params.id);
    res.status(204).send();
};