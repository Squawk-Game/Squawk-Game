import React, { Component } from 'react'
import Modal from 'react-responsive-modal';

export default class SorryModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.onOpenModal = this.onOpenModal.bind(this)

  }

  onOpenModal() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div>
        <Modal open={this.state.open} onClose={this.props.reset} little>
          <h3 className="sorry-text">Sorry, you're already in a game!</h3>
        </Modal>
      </div>
    );
  }
}
