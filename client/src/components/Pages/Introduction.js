import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data.services";
import Image from 'mui-image';
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";

const Introduction = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    DataService.read("Introduction")
      .then((res) => {
        if (res.data) {
          setData(res.data);
          if (res.data.cover) {
            MediaService.read(res.data.cover)
              .then((res) => {
                setCover(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (<>
    {/* edit button */}
    {user && <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" component={Link} to={`/form/introduction`}>Edit</Button>
    </Box>}
    <Box sx={{ width: "100%", textAlign: 'center' }}>
      <Typography variant="h1" gutterBottom className="themeFont">
        {data ? data.title : "Loading..."}
      </Typography>

      {/* load image */}
      {cover && <Image src={cover.path} alt={cover.name} />}

      <Typography variant="subtitle1" gutterBottom className="themeFont">
        {data ? data.description : "Loading..."}
      </Typography>

      {/* show an image as cover */}
      {data && data.cover && data.cover.url && (
        <>
          <img src={data.cover.url} alt={data.cover.title} />
          <Typography variant="subtitle1" gutterBottom  className="themeFont">
            {data.cover.description}
          </Typography>
        </>
      )}
    </Box>
  </>);
};

export default Introduction;
