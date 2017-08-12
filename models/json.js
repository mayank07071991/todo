building: [{
    Building_id: {
        type: String,
        required: 'Building Id Required'
    },

    Building_address: {
        type: String,
        required: 'Building address Required'
    }
    Building_Name: {
        type: String,
        required: 'Building Name Required'
    }

    Restaurant: [{
        Restaurant_id: {
            type: String,
            required: 'Building Id Required'
        },

        Restaurant_address: {
            type: String,
            required: 'Building address Required'
        },
        Restaurant_Name: {
            type: String,
            required: 'Building Name Required'
        },
        Restaurant_status: {
            type: String,
            required: 'Building Name Required'
        }

        Products: [{
            Product_id: {
                type: String,
                required: 'Building Id Required'
            },

            Product_Name: {
                type: String,
                required: 'Building Name Required'
            },
            Product_status: {
                type: String,
                required: 'Building Name Required'
            }

        }]

    }]

}]