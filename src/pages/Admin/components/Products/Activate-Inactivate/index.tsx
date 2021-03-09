import React from 'react'

function ActivateProduct(props: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; }) {
    return (
        <button onClick={props.onClick}>Ativar</button>
    );
}

function InactivateProduct(props: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; }) {
    return (
        <button onClick={props.onClick}>Inativar</button>
    );
}

function ShowButton(props: { status: any; }) {
    const status = props.status;
    if (status) {
        return 
        // <InactivateProduct />;
    }
    return 
    // <ActivateProduct />;
}

export class ActivateInactivateProduct extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.handleActivate = this.handleActivate.bind(this);
        this.handleInactivate = this.handleInactivate.bind(this);
        this.state = { status: true};
    }

    handleActivate() {
        this.setState({status: true});
    }

    handleInactivate() {
        this.setState({status: false});
    }

    render() {
        const status = this.state;
        let button;
        if (status) {
            button = <InactivateProduct onClick={this.handleInactivate} />;
        } else {
            button = <ActivateProduct onClick={this.handleActivate} />;
        }

        return (
            <div>
                {/* <ShowButton status={status} /> */}
                {button}
            </div>
        );
    }
}