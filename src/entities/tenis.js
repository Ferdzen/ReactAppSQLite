import { EntitySchema } from "typeorm";

const Tenis = new EntitySchema({
    name: "Tenis",
    tableName: "tenis",
    columns:{
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        brand:{
            type: "varchar",
        },
        model: {
            type: "varchar"
        },
        price: {
            type: "float"
        }
    }
})

export default Tenis;