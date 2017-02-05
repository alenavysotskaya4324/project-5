

class FSM {
	
	
    /**
     * Creates new FSM instance.
     * @param config
     */	 
    constructor(config) {
		if(config===null)
			throw Error();
		this.FSM=config;
		this.arrayOfStates=[config.initial];
		this.popState=[];
		//console.log(this.arrayOfStates);
		this.currState=config.initial;
		//this.states=config.states;
		
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		//console.log(this.currState);
		return this.currState;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		if(state in this.FSM.states) {
			this.currState=state;
			this.arrayOfStates.push(this.currState);
			//console.log(this.arrayOfStates);
		}
		else throw Error();
		//console.log(this.currState);
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		if(event in this.FSM.states[this.currState].transitions) {
			this.currState=this.FSM.states[this.currState].transitions[event];
			this.arrayOfStates.push(this.currState);
		}
		else throw Error();
		//console.log(this.currState);
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.currState=this.FSM.initial;
		this.arrayOfStates.push(this.currState);
		//console.log(this.currState);
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var accessStates=[];
		var st;
		
		if(!event)
			for(st in this.FSM.states)
				accessStates.push(st);
		else {
			for(st in this.FSM.states)	
				if(event in this.FSM.states[st].transitions)
						accessStates.push(st);
	}
		//console.log(accessStates);
		return accessStates;
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		//console.log(this.arrayOfStates.length);
		if(this.arrayOfStates.length===1 || this.arrayOfStates.length===0) 
			return false;
		else{
			this.popState.push(this.currState);
			this.arrayOfStates.pop(this.arrayOfStates.length-1);
			this.currState=this.arrayOfStates[this.arrayOfStates.length-1];
			//console.log(this.arrayOfStates);
			return true;
		}
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		var st;
		if(((this.arrayOfStates.length===1 || this.arrayOfStates.length===0) && this.popState.length===0) 
			|| (this.popState.length===0)
			|| (this.popState[this.popState.length-1]===this.currState))
			return false;
		else{	
			
			this.currState=this.popState[this.popState.length-1];
			//console.log(this.currState);
			this.popState.pop(this.popState.length-1);
			this.arrayOfStates.push(this.currState);
			//console.log(this.arrayOfStates);
			return true;
		}
		
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		while(this.arrayOfStates.length!==0)
			this.arrayOfStates.pop(this.arrayOfStates.length-1);	
		
	}
	
	
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
