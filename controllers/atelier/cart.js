const Atelier = require("../../models/Atelier");

const cartCont = {
  //@desc post a Cart
  postCart: async (req, res) => {
        try {
            const {atelierName, address} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                atelierName, address
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

  //@desc get all contacts
  /*getContact=async(req,res)=>{
    try {
        const result = await Contact.find();
        res.send({response:result,message:"geting contacts successfuly"})
    } catch (error) {
        res.status(400).send({message:"can not get contacts"})
    }
}*/

  //@desc get one contact
  /*getContactById=async(req,res)=>{
    try {
        const result = await Contact.findOne({_id:req.params.id});
        res.send({response:result,message:"geting contacts successfuly"})
    } catch (error) {
        res.status(400).send({message:"there is no contact with this id"})
    }
}*/

  //@desc delete one contact by id
  /*deleteContact=async(req,res)=>{
    try {
        const result = await Contact.deleteOne({_id:req.params.id});
        result.n?res.send({message:"contact is deleted"})
        :res.send({message:"contact is already deleted"})
    } catch (error) {
        res.status(400).send({message:"there is no contact with this id"})
    }
}
 */

  //@desc update one contact by id
  /*updateContact=async(req,res)=>{
    try {
        const result = await Contact.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}});

        result.nModified?res.send({message:"contact is updated"})
        :res.send({message:" contact is already updated"})
    } catch (error) {
        res.status(400).send({message:"there is no contact with this id"})
    }
}*/
};

module.exports = cartCont;
