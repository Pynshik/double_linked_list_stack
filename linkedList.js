class DoubleLinkedListNode {
    constructor(value, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
};

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    };

    prepend(value) {
        const newNode = new DoubleLinkedListNode(value);

        if(this.head) {
            this.head.previous = newNode;
        }

        newNode.next = this.head;
        this.head = newNode;
        this.length++;

        if(!this.tail) {
            this.tail = newNode;
        }

        return this;
    };

    append(value) {
        const newNode = new DoubleLinkedListNode(value);

        if(this.tail) {
            this.tail.next = newNode;
        }

        newNode.previous = this.tail;
        this.tail = newNode;
        this.length++;
        
        if(!this.head) {
            this.head = newNode;
        }

        return this;
    };

    delete(value) {
        if(!this.head) return null;

        let deletedNode = null;
        let currentNode = this.head;

        while(currentNode){
            if(currentNode.value === value) {
                deletedNode = currentNode;

                const previousNode = currentNode.previous;
                const nextNode = currentNode.next;

                if(deletedNode === this.head) {
                    this.head = nextNode;
                    if(this.head) this.head.previous = null;
                    else {
                        this.head = null;
                        this.tail = null;
                    }
                } else if(deletedNode === this.tail) {
                    this.tail = previousNode;
                    this.tail.next = null;
                    if(!this.tail) this.head = null;
                } else {
                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }    
            }

            this.length--;
            currentNode = currentNode.next;
        }

        return deletedNode;
    };

    deleteTail() {
        if(!this.head) return null;

        let deletedTail = this.tail;

        if(!this.tail.previous){
            this.tail = null;
            this.head = null;
        } else {
            this.tail = this.tail.previous;
            this.tail.next = null;
        }

        this.length--;
        return deletedTail;
    };

    deleteHead() {
        if(!this.head) return null;

        const deletedHead = this.head;

        if(!this.head.next) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.previous = null;
        }

        this.length--;
        return deletedHead;
    };

    find(value) {
        if(!this.head) return null;

        let currentNode = this.head;

        while(currentNode) {
            if(currentNode.value === value) return currentNode;
            currentNode = currentNode.next;
        }

        return null;
    };


};

class Stack {
    constructor() {
        this.items = new DoubleLinkedList();
    };

    push(value) {
        this.items.append(value);
    };

    pop() {
        if(!this.items.head) throw new Error('The Stack is empty');
        const deletedTail = this.items.tail;
        this.items.deleteTail();
        return deletedTail;
    };

    peek() {
        if(!this.items.head) throw new Error('The Stack is empty');
        return this.items.tail;
    };

    count() {
        if(!this.items.head) return 0;

        return this.items.length;
    };
}