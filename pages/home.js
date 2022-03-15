import Image from "next/image";
import React, { useEffect, useState } from "react";
import buildUrl, { buildImageUrl } from "cloudinary-build-url";
import CloudinaryImg from "../component/images/CloudinaryImg";

const home = () => {
  const url = buildUrl("cld-sample", {
    cloud: {
      cloudName: "itish22",
    },
    // transformations: {
    //   effect: {
    //     name: "pixelate",
    //     value: 40,
    //   },
    // },
  });
  const urlBlur = buildUrl("cld-sample", {
    cloud: {
      cloudName: "itish22",
    },
    transformations: {
      effect: {
        name: "blur:1000",
        quality: 1,
      },
    },
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [image, setImage] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setTimeout(() => {
      setImage(url);
    }, 2000);
  }, []);

  return (
    <div className="grid grid-cols-3">
      <div className="card">
        <figure className="mx-auto w-[210px] shadow-md dark:shadow-none">
          <CloudinaryImg
            publicId="v1647267904/the-batman-just-play-a-game-bj-3840x2400_b1onic.jpg"
            width="210"
            height="149"
            alt="Your alt text"
          />
          <h4>Rober pattinsion is a good Batman</h4>
          <p className="text-lg  font-bold">
            Importing from component cloudinary
          </p>
        </figure>
      </div>
      <div className="card">
        <Image src="/Batman.jpg" alt="BatMan Image" width="1000" height="750" />
        <h4>Rober pattinsion is a good Batman</h4>
        <p className="text-lg  font-bold">from Locally</p>
      </div>
      <div className="card">
        <CloudinaryImg
          publicId="https://res.cloudinary.com/itish22/image/upload/v1647267312/cld-sample.jpg"
          width="1000"
          height="750"
          alt="Your alt text"
        />
        {/* <Image
          src="https://res.cloudinary.com/itish22/image/upload/v1647267312/cld-sample.jpg"
          alt="BatMan Image"
          width="1000"
          height="750"
        /> */}
        <h4>Rober pattinsion is a good Batman</h4>
        <p className="text-lg  font-bold">Cloudinary Image - static</p>
      </div>
      <div className="card">
        <Image src={url} alt="BatMan Image" width="1000" height="750" />
        <h4>Rober pattinsion is a good Batman</h4>
        <p className="text-lg font-bold">Cloudnary-dynamic</p>
      </div>
      <div className="card">
        <Image
          src={urlBlur}
          unoptimized={true}
          alt="BatMan Image"
          width="1000"
          height="750"
        />
        <h4>Rober pattinsion is a good Batman</h4>
        <p className="text-lg  font-bold">Cloudinary Image - blured </p>
      </div>
      <div className="card">
        <div
          style={{
            position: "relative",
            height: 0,
            paddingTop: `${(750 / 1000) * 100}%`,
            backgroundImage: `url(${urlBlur})`,
            backgroundPosition: "center center",
            backgroundSize: `100%`,
          }}
        >
          <div className="absolute top-0 left-0">
            {image && (
              <Image
                src={image}
                unoptimized={true}
                alt="BatMan Image"
                width="1000"
                height="750"
              />
            )}
          </div>
          <h4>Rober pattinsion is a good Batman</h4>
          <p className="text-lg  font-bold">
            Cloudinary Image - blured after 2 sec{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default home;
