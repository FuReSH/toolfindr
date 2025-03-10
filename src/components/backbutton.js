import * as React from "react";
import { Link } from "gatsby";

const BackButton = ( {goto, gotolink}) => {
    const back = goto || "Home";
    const link = gotolink || "/";

    return (
<div className="row my-3">
<div className="col-xs-4 col-sm-5">
  <Link className="shadow-sm btn btn-outline-secondary" to={link}>⤌ {back}</Link>
</div>
</div>

)}

export default BackButton;