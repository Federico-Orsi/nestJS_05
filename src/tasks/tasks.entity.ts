

export class ProductoTS{

        title: string
        description: string
        owner: string
        code: number
        price:number 
        status: string
        stock: number
        category: string
        thumbnails: string

    constructor({ title,  description, owner, code, price, status, stock, category, thumbnails}){
        
        this.title=title,
        this.description=description,
        this.owner=owner,
        this.code=code, 
        this.price=price,
        this.status=status,
        this.stock=stock,
        this.category=category,
        this.thumbnails=thumbnails
       
        
       if (title == undefined) {
    
        throw new Error('Falta el Title');
       } 
    
       if (description == undefined) {
    
        throw new Error('Falta la Description');
       } 
    
       if (price == undefined) {
    
        throw new Error('Falta el Price');
       } 
    
       if (code == undefined) {
    
        throw new Error('Falta el Code');
       
       } 
    
       if (thumbnails == undefined) {
    
        throw new Error('Falta la imagen');
       } 
    
       
    
       if (status == undefined) {
    
        throw new Error('Falta el Status');
       } 
    
       if (stock == undefined) {
    
        throw new Error('Falta el Stock');
       } 
    
       if (category == undefined) {
    
        throw new Error('Falta la Category');
       } 
       
    
    }
    }
    

    const nuevoProd = new ProductoTS({ 
        title: "asjdha", 
    description: "kjashd", 
    owner: "lkasjdkla", 
    code: "54654sdfs",
    price: "56456dsfs", 
    status: "lkasjdkla", 
    stock:54654 , 
    category: "lkasjdkla",
    thumbnails: "lkasjdkla"
})


console.log(nuevoProd);

nuevoProd.owner = "federico Orsi"
nuevoProd.price = 123
nuevoProd.code = 123


console.log(nuevoProd);

