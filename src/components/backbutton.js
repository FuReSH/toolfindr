import * as React from "react";
import { Link } from "gatsby";
import { GoArrowLeft } from "react-icons/go";

const BackButton = ( {goto, gotolink}) => {
    const back = goto || "Home";
    const link = gotolink || "/";

    return (
<div className="row my-3">
<div className="col-xs-4 col-sm-5">
  <Link 
    className="shadow-sm btn btn-primary icon-link icon-link-hover" 
    to={link}>
    <GoArrowLeft />{back}
  </Link>
</div>
</div>

)}

export default BackButton;
