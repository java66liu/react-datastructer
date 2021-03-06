import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import './DrawerUndocked.css'
import {Link} from 'react-router-dom'

export default class DrawerUndocked extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div className={this.props.className}>
        <RaisedButton
          label={this.props.title}
          onTouchTap={this.handleToggle}
          secondary={this.props.colored}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Link to="/"><MenuItem onTouchTap={this.handleClose}><p>主页</p></MenuItem></Link>
          <Link to="/heap"><MenuItem onTouchTap={this.handleClose}> 堆 (Heap) </MenuItem></Link>
          <Link to="/list"><MenuItem onTouchTap={this.handleClose}>线性表 (List)</MenuItem></Link>
          <Link to="/bst"><MenuItem onTouchTap={this.handleClose}>二叉搜索树 (BST)</MenuItem></Link>
          <Link to="/tttree"><MenuItem onTouchTap={this.handleClose}>二三树 (TTTree)</MenuItem></Link>
          <Link to="/stack"><MenuItem onTouchTap={this.handleClose}>栈 (Stack) </MenuItem></Link>
          <Link to="/queue"><MenuItem onTouchTap={this.handleClose}>FIFO队列 (Queue)</MenuItem></Link>
          <Link to="/priorityqueue"><MenuItem onTouchTap={this.handleClose}>优先队列 (PQ)</MenuItem></Link>
          <Link to="/hashtable"><MenuItem onTouchTap={this.handleClose}>哈希表(HashTable)</MenuItem></Link>
          <Link to="/game"><MenuItem onTouchTap={this.handleClose}><p>游戏区</p></MenuItem></Link>
          <Link to="/gamebst"><MenuItem onTouchTap={this.handleClose}>填满BST</MenuItem></Link>
          <Link to="/gametttree"><MenuItem onTouchTap={this.handleClose}>探索二三树</MenuItem></Link>
          
        </Drawer>
      </div>
    );
  }
}