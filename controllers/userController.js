const User = require('../models/model');
const mongoose = require('mongoose');

exports.addMarker = async (req, res) => {
    const { coords, name } = req.body.items
    const id = req.params.id
    let currentUser = await User.findById(id)

    if (!(coords) || !(name)) {
        return res.status(400).send({
            response: "error",
            message: "fill all inputs"
        })
    }

    if ((typeof(coords) != Array) && (coords.length != 2))
    {
        return res.status(400).send({
            response: "error",
            message: "enter correct coords"
        })
    }

    currentUser.items.push({coords, name});
    console.log(currentUser)
    await currentUser.save();

    return res.status(200).send({
        response: "ok",
        items: {coords, name}
    })

};

exports.updMarker = async (req, res) => {
    const { coords, name } = req.body.items
    const { marker, id } = req.params
    const currentUser = await User.findById(id)

    if (!(coords) || !(name)) {
        return res.status(400).send({
            response: "error",
            message: "fill all inputs"
        })
    }

    if ((typeof(coords) != Array) && (coords.length != 2))
    {
        return res.status(400).send({
            response: "error",
            message: "enter correct coords"
        })
    }

    currentUser.items.forEach(item => {
        if (marker == item._id) {
            item.coords = coords
            item.name = name
        }
    });

    await currentUser.save()

    return res.status(200).send({
        response: "ok",
        items: {coords, name}
    })
}

exports.removeMarker = async (req, res) => {
    const { marker, id } = req.params
    const currentUser = await User.findById(id)

    currentUser.items.forEach((item, index) => {
        if (marker == item._id) {
            currentUser.items.splice(index, 1)
        }
    });

    await currentUser.save()

    return res.status(200).send({
        response: "deleted succesfully",
    })
    
}

exports.allMarkers = async (req, res) => {
    const id = req.params.id
    const currentUser = await User.findById(id)

    return res.status(200).send({
        response: "list of markers",
        list: currentUser.items,
    })

}