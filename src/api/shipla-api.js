/**
 * shiplet API
 *
 * API for shiplet
 *  
 * @version 0.1.0
 * 
 * @author Damian Balandowski (damianbal)
 */

import axios from "axios"
import { shipla_apiURL } from "./shipla-config"

//-----------------------------------------
// User
//-----------------------------------------
export class User {

    /**
     * Return users containers
     */
    static getContainers() {
        return axios.get(shipla_apiURL + "user/containers")
    }

}

//-----------------------------------------
// Auth
//-----------------------------------------
export class Auth {

    /**
     * Returns currently signed in user
     */
    static user() {
        return axios.get(shipla_apiURL + 'user')
    }

    /**
     * Sign in the user, response will include user info and token
     * 
     * @param {string} email 
     * @param {string} password 
     */
    static auth(email, password) {
        return axios.post(shipla_apiURL + 'sign-in', {email,password})
    }

    /**
     * Sign up the user, response will return user info, token
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     */
    static create(email, password, name = null) {
        return axios.post(shipla_apiURL + 'sign-up', {email,password,name:name})
    }

    /**
     * Sign out
     */
    static signOut() {
        localStorage.removeItem("token")
    }
}

//-----------------------------------------
// Utils
//-----------------------------------------
export function itemToHTML(item) {
    let keys = Object.keys(item);

    let html = "";

    keys.forEach(key => {
        let val = item[key];

        html += "<div>";
        // is it an object?
        if(typeof val == "object") {
            html += "Object '" + key + "' " + " { " + itemToHTML(val) + "}";
        }
        else {
            html += "" + key + " -> " + val + "";
        }
        html += "</div>";
    })

    return html;
}

export function objectToArray(obj) {
    let arr = [];

    Object.keys(obj).forEach(key => {
        arr.push({name: key, value: obj[key]})
        console.log(key,obj[key])
    })

    return arr
}

//-----------------------------------------
// Container
//-----------------------------------------
export class Container {
    
    constructor(reference) {
        this.reference = reference;
    }

    /**
     * Returns container data
     */
    data() {
        return Container.getContainer(this.reference)
    }

    /**
     * Creates new Container object and returns it with reference
     * @param {string} ref 
     */
    static container(ref) {
        return new Container(ref);
    }

    /**
     * Returns info about container
     * 
     * @param {string} ref
     * @param {callback} cb 
     */
    info(cb) {
        let url = shipla_apiURL + "containers/" + this.reference + "/info"

        axios.get(url).then(resp => {
            cb(resp.data)
        }).catch(err => {
            console.error('info', err)
        })
    }

    /**
     * Returns sorted items for page
     * 
     * @param {integer} index 
     * @param {callback} cb 
     * @param {string} sort_by 
     * @param {string} sort 
     */
    getItemsForPage(index, cb, sort_by = 'created_at', sort = 'DESC') {
        let url = shipla_apiURL + "containers/" + this.reference + "/items?"

        url += "sort_by=" + sort_by + "&sort=" + sort + "&page=" + index  

        axios.get(url).then(resp => cb(resp.data)).catch(err => {
            console.error(err)
        })
    }

    

    /**
     * Returns all items in container (sorted)
     * 
     * @param {callback} cb 
     */
    getAllItems(cb) {
        let url = shipla_apiURL+ "containers/" + this.reference + "/items"

        axios.get(url).then(resp => {
            cb(resp.data)
        }).catch(err => {
            console.error(err)
        })
    }

    /**
     * Get item from container by index
     * Avoid using it, use getItemByRef
     * 
     * @param {integer} index 
     * @param {callback} cb 
     */
    getItem(index, cb) {
        this.getItemByRef(index, cb)
    }

    /**
     * 
     * @param {string} item_ref 
     * @param {callback} cb 
     */
    getItemByRef(item_ref, cb) {
        let url = shipla_apiURL + "containers/" + this.reference + "/items/ref/" + item_ref
   
        axios.get(url).then(resp => {
            cb(resp.data)

        }).catch(err => {
            console.error('Error getItem', err)
        })
    }

    /**
     * Add item to container
     * @param {object} item 
     */
    addItem(item) {
        let url = shipla_apiURL + "containers/" + this.reference + "/items"

        return axios.post(url, { data: item })
    }

    /**
     * Set item, this will set actual objcect instead of updating fields
     * 
     * @param {integer} item_ref 
     * @param {object} item 
     */
    setItem(item_ref, item) {
        let url = shipla_apiURL + "containers/" + this.reference + "/items/" + item_ref 

        return axios.post(url, { data: item })
    }

    /**
     * Update item with new data
     * 
     * @param {integer} item_ref
     * @param {object} data 
     */
    updateItem(item_ref, data) {
        let url = shipla_apiURL + "containers/" + this.reference + "/items/" + item_ref

        return axios.patch(url, { data: data })
    }
    
    /**
     * Remove item with reference (only by owner of that item or container owner)
     * @param {integer} item_ref
     */
    removeItem(item_ref) {
        let url = shipla_apiURL + "containers/" + this.reference + "/items/" + item_ref

        return axios.delete(url)
    }

    /**
     * Add container 
     * @param {string} title 
     * @param {callback} created 
     */
    static add(title, created) {
        let url = shipla_apiURL + "containers"

        axios.post(url, { title: title }).then(resp => {
            if(resp.data.success) {
                created(resp.data)
            }
        }).catch(err => {
            console.error('Container.add error')
        })
    }

    /**
     * Remove container by reference
     * @param {string} ref 
     */
    static remove(ref) {
        let url = shipla_apiURL + "containers/" + ref 

        return axios.delete(url)
    }

    /**
     * Remove container
     */
    remove() {
        return Container.remove(this.reference)
    }

    /**
     * Return axios's promise to container
     * @param {string} ref 
     */
    static getContainer(ref) {
        let url = shipla_apiURL + "containers/" + ref

        return axios.get(url)
    }

    /**
     * Update container
     * @param {object} data 
     */
    update(data) {
        return Container.updateContainer(this.reference, data)
    }

    /**
     * Update container
     * 
     * @param {string} ref 
     * @param {object} data 
     */
    static updateContainer(ref, data) {
        let url = shipla_apiURL + "containers/" + ref + "/update"

        return axios.post(url, data)
    }
}

