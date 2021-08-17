import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useDispatch, useSelector } from "react-redux";
import './ContactCart.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from "@material-ui/core/Menu";
import { deleteCart, getCartById, likeCart, unlikeCart,toggleTrue } from '../../JS/Actions/atelierCart';
import CreateCommentCD from "./CreateCommentCD";
import CommentCD from "./CommentCD";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ContactCart({ContCart}) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleExpandClick = () => {
   dispatch(getCartById(ContCart._id))
    setExpanded(!expanded);
  };
 

  return (
    <Card className={classes.root}>
      <CardHeader
      action={
      ((auth.user.role==="admin")||(auth.user._id===ContCart.createdBy))?(
          <div >
          <IconButton //aria-label="settings" 
          aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
          >
            <MoreVertIcon />
            
          </IconButton>
            <Menu
            style={{ marginTop: "35px", margingRight:"5px" }}
            id="simple-menu"
            keepMounted
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          > 
          <Link className="linkcart" to={`/carte/edit/${ContCart._id}`}>
            <MenuItem onClick={() =>(dispatch(getCartById(ContCart._id)), dispatch(toggleTrue()))}>Edit</MenuItem>
            </Link>
            <MenuItem onClick={() => dispatch(deleteCart(ContCart._id))}>Delete</MenuItem>
          </Menu>
          </div>
       
        
      ):""}
        
        title={ContCart.atelierName}/>
        <div className="cart_cardmedia_img">
      <CardMedia
        className={classes.media}
        image={ContCart.pofilePicture}
        title="Atelier cart"
      />
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Responsible Name : {ContCart.responsibleName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Email : {ContCart.email}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Tel : {ContCart.contactNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Adress : {ContCart.ville +' - ' + ContCart.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <div
          onClick={() => {
            if (ContCart.likes.find((like) => like.user === auth.user._id)) {
              dispatch(unlikeCart(ContCart._id));
            } else {
              dispatch(likeCart(ContCart._id));
            }
          }}
        >
          <i
            className={
              ContCart.likes.find((like) => like.user === auth.user._id)
                ? "fas fa-heart"
                : "far fa-heart"
            }
          ></i>
          
        </div>
        
        <IconButton  className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <InsertCommentIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
        ({ContCart.likes.length} likes and {ContCart.comments.length} comments)
        </Typography>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>All Comments</Typography>
          <CreateCommentCD prodId={ContCart._id} />
          {ContCart.comments.map((el) => {
          return <CommentCD comment={el} key={el._id} />;
        })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
