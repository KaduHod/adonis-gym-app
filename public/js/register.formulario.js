class RegisterForm extends Formulario 
{
    constructor({ form, errorsContainer })
    {
        super({form, errorsContainer})
        this.action = 'http://127.0.0.1:3333/register'
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
        const { email, password, name, nickname, cellphone, confPassword } = this.getValues();
        const erros = { };
                
        if(name.length < 4){
            if(!erros.name) erros.name = []
            erros.name.push('Nome inválido')
        }
        
        /**
         * Nick_Name
         */
        if(nickname.length < 4){
            if(!erros.nickname) erros.nickname = []
            erros.nickname.push('Nick name inválido')
        }
        
        /**
         * Email
         */
        if(!email.length){
            if(!erros.email) erros.email = []
            erros.email.push('Email inválido')
        }
        
        /**
         * cellphone
         */
        if(!cellphone.length){
            if(!erros.cellphone) erros.cellphone = []
            erros.cellphone.push('Celular inválido')
        }
            
        /**
         * Password
         */
        if(password.length < 8) {
            if(!erros.password) erros.password = []
            erros.password.push('Senha inválida')
        }

        /**
         * confPassword
         */
        if(confPassword !== password) {
            if(!erros.confPassword) erros.confPassword = []
            erros.confPassword.push('Confirmação de senha inválida')
        }

        return erros;
    }

    handleErrors({name, nickname, email, password, cellphone})
    {
        const messages = []

        if(name) name.forEach(e => messages.push(e))
        if(nickname) nickname.forEach(e => messages.push(e))
        if(email) email.forEach(e => messages.push(e))
        if(password) password.forEach(e => messages.push(e))
        if(cellphone) cellphone.forEach(e => messages.push(e))
        
        this.displayErrorMessages({messages})
    }

    handleLogInAttempt = async (e) => 
    {
        this.errorsContainer.innerHTML = ''
        const errors = this.validateFields()
        if(Object.keys(errors).length) return this.handleErrors(errors);
        return await this.register()
    }

    async register()
    {
        const {confPassword, ...fields} = this.getValues()
        const req = await fetch(this.action, {
            headers:{ 'Content-Type' : 'application/json' },
            method : 'POST',
            body : JSON.stringify(fields),
        })

        const res = await req.json()
        if(req.status > 299 && res.errors) return this.handleErrors(res.errors)

        if(req.status == 201 && res.redirect) return window.location.href = 'http://127.0.0.1:3333' + res.redirect
            
        alert('Erro inexperado')
    }
}