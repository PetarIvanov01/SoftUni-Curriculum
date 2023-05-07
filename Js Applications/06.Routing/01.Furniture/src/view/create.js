import { html } from "../../node_modules/lit-html/lit-html.js"
import { sendData } from "../data/data.js";


const createTemplate = (onSubmit, errorMsg, errors) => html`
 <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
        ${errorMsg ? html`<div class="form-group">${errorMsg}</div>` : null}
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${'form-control' + (errors.make ? ' is-invalid' : '')} id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${'form-control' + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${'form-control' + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${'form-control' + (errors.description ? ' is-invalid' : '')} id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${'form-control' + (errors.price ? ' is-invalid' : '')} id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${'form-control' + (errors.img ? ' is-invalid' : '')} id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
    </div>`

export function showCreate(ctx) {

    update(null, {});

    function update(errorMsg, errors) {

        ctx.render(createTemplate(onSubmit, errorMsg, errors));
    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const isValid = validatData(formData, update);
        if (isValid != true) {
            return
        }

        const dataObj = [...formData.entries()].reduce((acc, [key, value]) => {
            return Object.assign(acc, { [key]: value });
        }, {});
        dataObj.price = Number(dataObj.price)
        dataObj.year = Number(dataObj.year)

        await sendData(dataObj);
        ctx.page.redirect('/')
    }

}

function validatData(formData, update) {

    const make = formData.get('make').trim();
    const model = formData.get('model').trim();
    const year = formData.get('year').trim();
    const description = formData.get('description').trim();
    const price = formData.get('price').trim();
    const img = formData.get('img').trim();

    try {
        const validator = {
            make:true,
            model:true,
            year:true,
            description:true,
            price:true,
            img:true,
        }

        if (make.length < 4 || model < 4) {
            validator.make = false
            throw {
                errorMsg: new Error('Make and Model must be at least 4 symbols long!'),
                errors: {
                    make: make.length < 4,
                    model: model < 4
                }
                
            }
        }
        if (Number(year) < 1950 || Number(year) > 2050) {
            throw {
                errorMsg: new Error('Year must be between 1950 and 2050'),
                errors: {
                    year: true,
                }
            }

        }
        if (description.length < 10) {
            throw {
                errorMsg: new Error('Description must be more than 10 symbols'),
                errors: {
                    description: true,
                }
            }
        }
        if (Number(price) < 0 || price == '') {
            throw {
                errorMsg: new Error('Price must be a positive number'),
                errors: {
                    price: true,
                }
            }
        }
        if (img == '') {
            throw {
                errorMsg: new Error('Image URL is required'),
                errors: {
                    img: true,
                }
            }
        }

        return true

    } catch (error) {
        const message = error.errorMsg || error.errors.message
        update(message, error.errors || {});
    }

}
