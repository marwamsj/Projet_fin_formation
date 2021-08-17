import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useDispatch, useSelector } from "react-redux";
import "./Forum.css";
import {
  deleteNeed,
  getNeedById,
  likeNeed,
  toggleTrue,
  unlikeNeed,
} from "../../JS/Actions/patientNeeds";
import CreateCommentFrm from "./CreateCommentFrm";
import CommentFrm from "./CommentFrm";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function NeedCart({ need }) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    dispatch(getNeedById(need._id));
    setExpanded(!expanded);
  };
  const formatter = buildFormatter(frenchStrings);
  return (
    <div className="cartneed">
      <div className="headneed">
        <div className="headneed-user">
          <div className="headneed-user-img">
            <img 
            src={
              need.pofilePicture
                ? need.pofilePicture
                : "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
            }
             alt="" />
          </div>
          <div className="headneed-username">
            <p>{need.username}</p>
            <TimeAgo date={need.updatedAt} formatter={formatter} />
          </div>
        </div>
        {auth.user.role === "admin" || auth.user._id === need.user ? (
          <div>
            <IconButton //aria-label="settings"
              aria-label="more"
              onClick={handleClick}
              aria-haspopup="true"
              aria-controls="long-menu"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              style={{ marginTop: "35px", margingRight: "5px" }}
              id="simple-menu"
              keepMounted
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => (
                  dispatch(getNeedById(need._id)), dispatch(toggleTrue())
                )}
              >
                Edit
              </MenuItem>

              <MenuItem onClick={() => dispatch(deleteNeed(need._id))}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="bodyneed">
        <p>{need.description}</p>
        <div className={need.besoinPictures ? "bodyneed-img" : ""}>
          {need.besoinPictures ? <img src={need.besoinPictures} alt="" /> : ""}
        </div>
      </div>

      <div className="footneed">
        <div
          className={
            need.likes.length === 0 && need.comments.length === 0
              ? "footneed-comment-unactive"
              : "footneed-comment-active"
          }
        >
          <div>
            {need.likes.length === 0 ? (
              ""
            ) : need.likes.length === 1 ? (
              <p>{need.likes.length} Like</p>
            ) : (
              <p>{need.likes.length} Likes</p>
            )}
          </div>
          <div>
            {need.comments.length === 0 ? (
              ""
            ) : need.comments.length === 1 ? (
              <p>{need.comments.length} Comment</p>
            ) : (
              <p>{need.comments.length} Comments</p>
            )}
          </div>
        </div>
        <div className="footneed-button">
          <CardActions disableSpacing>
            <div
              className="footneed-button-psitin"
              onClick={() => {
                if (need.likes.find((like) => like.user === auth.user._id)) {
                  dispatch(unlikeNeed(need._id));
                } else {
                  dispatch(likeNeed(need._id));
                }
              }}
            >
              <i
                className={
                  need.likes.find((like) => like.user === auth.user._id)
                    ? "fas fa-heart"
                    : "far fa-heart"
                }
              ></i>
              <span className="footneed-button-like">Like</span>
            </div>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <InsertCommentIcon />
            </IconButton>
            <span className="footneed-button-comment">Comment</span>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <p>All Comments</p>
              <CreateCommentFrm prodId={need._id} />
              {need.comments.map((el) => {
                return <CommentFrm comment={el} key={el._id} />;
              })}
            </CardContent>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default NeedCart;
