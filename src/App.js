//Importação de parâmetros
import React from 'react';
import { Col, Row, Container, Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup, InputGroupAddon } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import logoPNG from "./JobsNET.png"


const App = (props) => {
 
  
  //constantes do reactstrap
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const {
    buttonLabel,
    className
  } = props;


  //Validação de cep
  const verifyCEP = async () => {
    try{
      const dataCEP = await axios.get (`https://viacep.com.br/ws/${form.cep}/json/`);
        
      setForm ({...form, address : dataCEP.data.logradouro, 
        neighborhood : dataCEP.data.bairro,
        city : dataCEP.data.localidade
      });   
    }
    catch(error){
      alert( 'Preencha seu CEP corretamente.');      
    }
  }

  //enviando informações pro backend //TODO: verificar alertas
  const createCandidate = async (candidate) => {
    try{
      const user = await axios.post('https://jobsnetbackend.herokuapp.com/register', form);//quando hospedar o backend colocar a url onde tá o localhost

      if (user.status === 200) {
        alert( 'Seu cadastro foi realizado com sucesso.');
      }
    }catch(error){
        alert( 'Seu CPF já foi cadastrado.');      
      }
  };

  //objeto que armazena as informações a serem enviadas pro banco
  const [ form, setForm ] = useState({
    name: '',
    birth: '',
    maritalstatus: '',
    gender: '',
    cpf: '',
    rg: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    cep: '',
    email: '',
    cellphone: '',
    telephone: '',
    profession: '',
    intendposition: '',
  })
    //vericar os dados sendo preenchidos no objeto do form para ver se está sendo preenchido corretamente
  //useEffect (() => {
    //console.log(form);
  //}, [form]);

//declaração de constantes para controle de campos obrigatórios ou mal preenchidos
  const[ nameError, setNameError ] = useState(false);
  const[ birthError, setBirthError ] = useState(false);
  const[ cpfError, setCpfError ] = useState(false);
  const[ rgError, setRgError ] = useState(false);
  const[ addressError, setAddressError ] = useState(false);
  const[ numberError, setNumberError ] = useState(false);
  const[ neighborhoodError, setNeighborhoodError ] = useState(false);
  const[ cityError, setCityError ] = useState(false);
  const[ cepError, setCepError ] = useState(false);
  const[ emailError, setEmailError ] = useState(false);
  const[ cellphoneError, setCellphoneError ] = useState(false);
  const[ telephoneError, setTelephoneError ] = useState(false);
  const[ professionError, setProfessionError ] = useState(false);


  //Controle de dados obrigatórios e verificação da escrita, só vai enviar pro banco se todos os dados obrigatórios estiverem ok
    const validate = async () => {
    setNameError(false);
    setBirthError(false);
    setCpfError(false);
    setRgError(false);
    setAddressError(false);
    setNumberError(false);
    setNeighborhoodError(false);
    setCityError(false);
    setCepError(false);
    setEmailError(false);
    setCellphoneError(false);
    setTelephoneError(false);
    setProfessionError(false);

    //regex para verificação do formato da informação
    const reNumber = /^[0-9\b]+$/;
    const reCpf = /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/;
    const reEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const reCep = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;
    const reTel = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

    //Teste para saber se todas as informações estão completas e corretas para que, só assim, o cadastro seja enviado
    var isValid = true;
    
      if (!form.name){
        setNameError(true);
        isValid = false;
      }
      if(!form.birth){
        setBirthError(true);
        isValid = false;
      }
      if(!form.cpf || !reCpf.test(String(form.cpf).toLowerCase())){
        setCpfError(true);
        isValid = false;
      }
      if(form.rg && !reNumber.test(String(form.rg).toLowerCase())){
        setRgError(true)
        isValid = false;
      }
      if(!reCep.test(String(form.cep).toLowerCase())){
        isValid = false;
      }
      if (!form.address){
        setAddressError(true);
        isValid = false;
      }
      if(!form.number){
        setNumberError(true);
        isValid = false;
      }
      if (!form.neighborhood){
        setNeighborhoodError(true);
        isValid = false;
      }
      if (!form.city){
        setCityError(true);
        isValid = false;
      }
      if (!form.cep){
        setCepError(true);
        isValid = false;
      }
      if(!form.email || !reEmail.test(String(form.email).toLowerCase())){
        setEmailError(true);
        isValid = false;
      }
      if(!form.cellphone || !reTel.test(String(form.cellphone).toLowerCase())){
        setCellphoneError(true);
        isValid = false;
      }
      if(form.telephone  && !reTel.test(String(form.telephone).toLowerCase()))
      { 
        setTelephoneError(true);
        isValid = false;
      }
      if (!form.profession){
        setProfessionError(true);
        isValid = false;
      }
      if(isValid)
      {
        createCandidate();
      }
      else{
        alert('Preencha todos os dados obrigatórios ou verifique ser foram preenchidos corretamente')
      }
        return;
    }

   return (
    <Container className = 'classContainer classFont'>
      {/*Navbar*/}
        <Navbar className= 'classNavbar' dark>
          
           <NavbarBrand href="/" className="mr-auto">
           <img src = {logoPNG} style={{width:50, margin: 7}}></img>
             <Label>JobsNET</Label> 
            </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Quem Somos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Contato</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {/*/Navbar*/}

      {/*Content*/}

        <Row className = 'classRow'>
        <Col xs="3" md="2" sm="0"  ></Col>
        
        {/*Coluna central*/}
        <Col xs="6" md="8" sm="12">
        
    
       <h1 className="text-center"> Banco de Currículos</h1>         

        <Label><h5 className="classH">Dados Pessoais</h5></Label> 

     
          <FormGroup>
              <Label for="name">Nome Completo * </Label>
              <Input 
              className = 'classInput'
                onChange = {( e ) => {
                  setForm({ ...form, name: e.target.value});
                }} 
                value = {form.name}
                invalid = {nameError}/>
                <FormFeedback>Preencha o seu nome completo</FormFeedback>
            </FormGroup>
        
      <Row>
        <Col xs="4"  md="4" sm="12">
          <FormGroup>
              <Label for="birth">Data de Nascimento * </Label>
              <Input 
                className = 'classInput'
                type="date"
                name="date"
                id="exampleDate"
                placeholder="date placeholder"
                invalid 
                onChange = {( e ) => {
                  setForm({ ...form, birth: e.target.value});
                }} 
                value = {form.birth}
                invalid = {birthError}/>
                <FormFeedback>Preencha sua data de Nascimento</FormFeedback>
            </FormGroup>
        </Col>
        <Col xs="4"   md="4" sm="12">
        <FormGroup>
          <Label for="maritalstatus">Estado Civil</Label>
          <Input type="select" name="select" id="exampleSelect" className = 'classInput'
          onChange = {( e ) => {
            setForm({ ...form, maritalstatus: e.target.value});
          }} 
          value = {form.maritalstatus}>
            <option>Selecione uma opção</option>
            <option>Solteiro</option>
            <option>Casado</option>
            <option>União Estável</option>
            <option>Prefiro não informar</option>
            
          </Input>
          </FormGroup>
        </Col>
        <Col xs="4"   md="4" sm="12">
        <FormGroup>
          <Label for="gender">Gênero</Label>
          <Input type="select" name="select" id="exampleSelect" className = 'classInput'
          onChange = {( e ) => {
            setForm({ ...form, gender: e.target.value});
          }} 
          value = {form.gender}>
            <option>Selecione uma opção</option>
            <option>Feminino</option>
            <option>Masculino</option>
            <option>Outro</option>
            <option>Prefiro não informar</option>
            
          </Input>
          </FormGroup>
        </Col>
        <Col xs="3"></Col>
      </Row>
  
      <Row>
        <Col xs="6"  md="6" sm="12">
          <FormGroup>
            <Label for="cpf">CPF * </Label>
            <Input 
            className = 'classInput'
              placeholder="000.000.000-00" 
              invalid 
              onChange = {( e ) => {
                setForm({ ...form, cpf: e.target.value});
              }} 
              value = {form.cpf}
              invalid = {cpfError}/>
                <FormFeedback>Preencha o seu CPF (xxx.xxx.xxx-xx)</FormFeedback>
            </FormGroup>
        </Col>
        <Col xs="6"   md="6" sm="12">
          <FormGroup>
            <Label for="rg">Identidade</Label>
            <Input
            className = 'classInput'
              onChange = {( e ) => {
                setForm({ ...form, rg: e.target.value});
              }} 
              value = {form.rg}
              invalid = {rgError}/>
            <FormFeedback>Preencha somente com números</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
   
   
      <Row>
        
        <Col xs="12"><h5 className="classH">Informações de Endereço</h5></Col>
       
      </Row>

      <Row>
        <Col xs="12">
          <FormGroup>
          <Label for="cep">CEP * </Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <Button 
                className = 'classButtom'
                color="secondary"
                onClick = { () => verifyCEP() }>
                  Buscar CEP
                </Button>
              </InputGroupAddon>
              <Input 
              className = 'classInput'
                placeholder="00000-000" 
                invalid
                onChange = {( e ) => {
                  setForm({ ...form, cep: e.target.value});
                }} 
                value = {form.cep}
                invalid = {cepError}/>
              <FormFeedback>Preencha o CEP (xxxxx-xxx)</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      
      <Row>
      <Col xs="8"   md="8" sm="12">
        <FormGroup>
          <Label for="address">Logradouro * </Label>
          <Input 
          className = 'classInput'
            invalid 
            onChange = {( e ) => {
              setForm({ ...form, address: e.target.value});
            }} 
            value = {form.address}
            invalid = {addressError}/>
            <FormFeedback>Preencha o logradouro</FormFeedback>
        </FormGroup>
      </Col>
      <Col xs="4"   md="4" sm="12">
        <FormGroup>
            <Label for="number">Número * </Label>
            <Input 
            className = 'classInput'
              invalid 
              onChange = {( e ) => {
                setForm({ ...form, number: e.target.value});
              }} 
              value = {form.number}
              invalid = {numberError}/>
              <FormFeedback>Preencha o número</FormFeedback>
          </FormGroup>
      </Col>
      </Row>

      <Row>
      <Col xs="6"   md="6" sm="12">
        <FormGroup>
          <Label for="neighborhood">Bairro * </Label>
          <Input 
          className = 'classInput'
            invalid 
            onChange = {( e ) => {
              setForm({ ...form, neighborhood: e.target.value});
            }} 
            value = {form.neighborhood}
            invalid = {neighborhoodError}
            />
            <FormFeedback>Preencha o bairro</FormFeedback>
        </FormGroup>
      </Col>
      <Col xs="6"   md="6" sm="12">
        <FormGroup>
            <Label for="city">Cidade * </Label>
            <Input 
            className = 'classInput'
              invalid 
              onChange = {( e ) => {
                setForm({ ...form, city: e.target.value});
              }} 
              value = {form.city}
              invalid = {cityError}/>
              <FormFeedback>Preencha a cidade</FormFeedback>
          </FormGroup>
      </Col>
      </Row>

      <Row>
       
        <Col xs="12"><h5 className="classH">Informações de Contato</h5></Col>
       
      </Row>

      <Row>

        <Col xs="12">
          <FormGroup>
            <Label for="email">Email * </Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="nome@email.com"  className = 'classInput'
              invalid 
              onChange = {( e ) => {
                setForm({ ...form, email: e.target.value});
              }} 
              value = {form.email}
              invalid = {emailError}/>
            <FormFeedback>Preencha o seu email (xxx@xxx.xxx)</FormFeedback>
          </FormGroup></Col>
      </Row>

      <Row>

      <Col xs="6"   md="6" sm="12">
        <FormGroup>
          <Label for="cellphone">Celular * </Label>
            <Input placeholder="(00)999999999" 
            className = 'classInput'
              invalid 
              onChange = {( e ) => {
                setForm({ ...form, cellphone: e.target.value});
              }} 
              value = {form.cellphone}
              invalid = {cellphoneError}/>
                <FormFeedback>Preencha o seu celular (xx)xxxxxxxxx</FormFeedback>
          </FormGroup>
      </Col>
      <Col xs="6"   md="6" sm="12">
        <FormGroup>
          <Label for="telephone">Telefone </Label>
          <Input placeholder="(00)999999999" 
          className = 'classInput'
            onChange = {( e ) => {
              setForm({ ...form, telephone: e.target.value});
            }} 
            value = {form.telephone}
            invalid = {telephoneError}/>
          <FormFeedback>Preencha o seu telefone corretamente (xx)xxxxxxxxx</FormFeedback>
        </FormGroup>
      </Col>
      </Row>

      <Row>
        
        <Col xs="12"><h5 className="classH">Informações Profissionais</h5></Col>
        
      </Row>

      <Row>
      <Col xs="6"   md="6" sm="12">
      <FormGroup>
          <Label for="profession">Profissão * </Label>
            <Input 
            className = 'classInput'
              invalid 
              onChange = {( e ) => {
                setForm({ ...form, profession: e.target.value});
              }} 
              value = {form.profession}
              invalid = {professionError}/>
                <FormFeedback>Preencha a sua profissão</FormFeedback>
          </FormGroup>
      </Col>
      <Col xs="6"   md="6" sm="12">
      <FormGroup>
          <Label for="intendposition">Cargo Pretendido </Label>
          <Input
          className = 'classInput'
            onChange = {( e ) => {
              setForm({ ...form, intendposition: e.target.value});
            }} 
            value = {form.intendposition}/>
        </FormGroup>
      </Col>
      </Row>
      
      <Row>
        <Col xs="12">
        <Label for="intendposition">* Dados obrigatórios</Label>
        </Col>
      </Row>
      <Row>
       <Col xs="12">
          <Button 
            className = 'classButtom'
            color="secondary"
            onClick = { () => validate() }>Enviar cadastro</Button>{' '}
        </Col>
      </Row>

        </Col>
        {/*/Coluna central*/}

        <Col xs="3" md="2" sm="0"></Col>
        </Row>
      {/*/Content*/}

      {/*Footer */}
      <footer className = 'classFooter'>
        <div className='text-center'>
          <span >&copy; 2021 - JobsNET - Desenvolvido por Gessy Sousa</span>
        </div>
      </footer>
      {/*Footer */}

    </Container>

  );
}

    export default App;
