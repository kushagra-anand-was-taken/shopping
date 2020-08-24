import React, { useEffect } from "react";
import axios from "axios";

const ShowImage = ({ item }) => () => {
  const res = axios({
    method: "get",
    url: "/api/products/photo",
    // responseType: "arraybuffer", //arraybuffer
    headers: {
      productid: item._id,
    },
  });
  console.log(res.data);
  // res
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));
  // const imgFile = new Blob([res.data]);
  // const imgUrl = window.URL.createObjectURL(imgFile);
  // console.log(res.data);
  //   console.log(imgFile);
  // console.log(imgUrl);

  return (
    <div className="product-img">
      <img
        src={res.data}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );

  // axios({
  //   method: "get",
  //   url: "/api/products/photo",
  //   responseType: "blob", //arraybuffer
  //   headers: {
  //     productid: item._id,
  //   },
  // })
  //   .then((res) => {
  //     const imgFile = new Blob([res.data]);
  //     const imgUrl = URL.createObjectURL(imgFile);
  //     return (
  //       <div className="product-img">
  //         <img
  //           src={imgUrl}
  //           alt={item.name}
  //           className="mb-3"
  //           style={{ maxHeight: "100%", maxWidth: "100%" }}
  //         />
  //       </div>
  //     );
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

export default ShowImage;
