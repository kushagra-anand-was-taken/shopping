import React, { useEffect } from "react";
import axios from "axios";

const ShowImage = ({ item }) => {
  const res = axios({
    method: "get",
    url: "/api/products/photo",
    responseType: "arraybuffer",
    headers: {
      productid: item._id,
    },
  });
  // res
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));
  const imgFile = new Blob([res.data]);
  const imgUrl = URL.createObjectURL(imgFile);
  //   console.log(res);
  //   console.log(imgFile);
  //   console.log(imgUrl);

  return (
    <div className="product-img">
      <img
        src={imgUrl}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
};

export default ShowImage;
