const Tenant = require('../models/Tenant')

exports.getAllTenants= async(req,res)=>{
    const tenants = await Tenant.find().populate('subscribedProducts');
    res.json(tenants);
};

exports.createTenant = async (req,res) =>{
    const {name,email,phone,plan,subscribedProducts}= req.body;
    const tenant = new Tenant ({name, email,phone,plan,subscribedProducts});
    await tenant.save();
    res.status(201).json(tenant);
}

exports.updateTenant = async(req,res)=>{
    const {id}= req.params;
    const {name,email,phone,plan,subscrubedProducts}=req.body;
    const tenant = await Tenant.findByIdAndUpdate(id, {name,email,phone,plan,subscrubedProducts},{new:true});
    res.json(tenant);
}

exports.deleteTenant = async (req,res)=>{
    await Tenant.findByIdAndDelete(req.params.id);
    res.status(204).send();
};