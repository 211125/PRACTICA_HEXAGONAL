import express from "express";
import cors from "cors";
import "dotenv/config";
import { taskeRoutes } from "./taske/infraestructure/taskeRoutes";





const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/taske', taskeRoutes);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
