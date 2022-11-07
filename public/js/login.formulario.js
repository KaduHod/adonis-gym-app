class LoginForm extends Formulario 
{
    constructor({ form, errorsContainer })
    {
        super({form, errorsContainer})
        this.action = 'http://127.0.0.1:3333/login'
        this.setEvents()
    }

    setEvents()
    {
        this.submitButton.addEventListener('click', this.handleLogInAttempt)
        this.form.addEventListener('submit', e => {
            e.preventDefault();
        })
    }

    validateFields()
    {
        const { email, password } = this.getFields();
        const erros = { };
                
        if(email.length < 4){
            if(!erros.email) erros.email = []
            erros.name.push('Email deve ser preenchido')
        }

        /**
         * Password
         */
         if(password.length < 8) {
            if(!erros.password) erros.password = []
            erros.password.push('Senha inválida')
        }

        return erros;
    }

    handleErrors({ email, password })
    {
        const messages = []

        if(email) email.forEach(e => messages.push(e))
        if(password) password.forEach(e => messages.push(e))
                
        this.displayErrorMessages({messages})
    }

    handleLogInAttempt = async (e) => 
    {
        this.errorsContainer.innerHTML = ''
        const errors = this.validateFields()
        if(Object.keys(errors).length) return this.handleErrors(errors);
        return this.form.submit()
    }

}