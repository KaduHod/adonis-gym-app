class Formulario {
    constructor({ form, errorsContainer })
    {
        this.form = form
        this.errorsContainer = errorsContainer ?? null
        this.fields = [];
        this.buttons = [];
        this.submitButton = null;
        
        this.setFields();
        this.setButtons();
        this.setSubmitButton();
    }

    setFields(){
        this.fields = [
            ...document.getElementsByTagName('input'),
            ...document.getElementsByTagName('text-area'),
            ...document.getElementsByTagName('select')
        ]
    }

    addField({id}){
        const newField = document.getElementById(id);
        const tagsAccepted = [
            'input', 'text-area', 'select'
        ];
        if(tagsAccepted.indexOf(newField.tagName) == -1) return;
        this.addField.push(newField);
    }

    removeField({id}){
        this.fields = this.fields
                        .filter( field => field.id !== id )
    }

    getFields(){
        return this.fields.reduce(  (acc, curr) => {
            acc[curr.name] = curr;
            return acc;
        }, {})
    }

    getValues(){
        return this.fields.reduce(  (acc, curr) => {
            acc[curr.name] = curr.value;
            return acc;
        }, {})
    }
    setSubmitButton()
    {
        this.submitButton = this.buttons
                                .find( button => button.dataset.submit)
    }

    setButtons(){
        this.buttons = [
            ...document.getElementsByTagName('a'),
            ...document.getElementsByTagName('button')
        ]
    }

    setErrorsContainer(container) { 
        this.errorsContainer = container
    }

    displayErrorMessages({messages}){
        this.errorsContainer.innerHTML = '';
        messages.forEach( (error, index) => {
            this.errorsContainer.innerHTML+= error
            if(index < messages.length) this.errorsContainer.innerHTML+= "<br>"
        });
    }
}