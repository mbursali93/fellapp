import { useContext, useState } from "react"
import Navbar from "../components/Navbar"
import Photobar from "../components/Photobar"
import { GlobalState } from "../api/GlobalState"
import "./styles/editStyles.css"
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from "axios"
import { storage } from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import {v4} from "uuid"
import { useEffect } from "react"


export default function Edit() {

    const state = useContext(GlobalState)
    const [token] = state.token
    const [loggedUser, setLoggedUser] = state.userAPI.loggedUser
    const [loggedUserPhotos, setLoggedUserPhotos] = state.userAPI.loggedUserPhotos

    const [username, setUsername] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
   

    const user_id = localStorage.getItem("user_id")

    const avatarListRef = ref(storage, `avatars/${user_id}`)
    const imagesListRef = ref(storage, `images/${user_id}`)


    const uploadAvatar = () => {
        if(avatar == null) return;
        const imageRef = ref(storage, `avatars/${user_id}/${ Date.now() + "_" + avatar.name + v4()} `)
        uploadBytes(imageRef, avatar).then(()=> {
            listAll(avatarListRef).then((response)=>{
                getDownloadURL(response.items[response.items.length - 1]).then((url)=> {
                     axios.put(`${process.env.REACT_APP_API_URL}/users/avatar/${user_id}`, {profile_picture:url}, {headers:{Authorization:token}})
                    window.location.href="/edit"
                })
            } )
        })
    }

   
    
        const uploadImages = () => {
       
            if(image == null) return;
            const imageRef = ref(storage, `images/${user_id}/${Date.now() + "_" + image.name + v4()} `)
            uploadBytes(imageRef, image).then(()=> {
                listAll(imagesListRef).then((response)=>{
                    getDownloadURL(response.items[response.items.length - 1]).then((url)=> {
                         axios.post(`${process.env.REACT_APP_API_URL}/users/photos/${user_id}`, {photo_link:url}, {headers:{Authorization:token}})
                        window.location.href="/edit"
                    })
                } )
            })
            

            
    
        }
    
        
        
    

    const handleDelete = async (photo_id) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/photos/${user_id}`, {photo_id: photo_id}, {headers: {Authorization:token}})
            window.location.href="/edit"
        } catch {

        }
    }

    const handleUploadCredentials = async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/credentials/${user_id}`,  {username,description}, {headers: {Authorization:token}})
            window.location.href="/edit"
        } catch {

        }
    }

    const handleUploadPassword = async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/password/${user_id}`,  {password, verifyPassword}, {headers: {Authorization:token}})
            window.location.href="/edit"
        } catch {

        }
    }
    


    return (
        <div>
            <Navbar/>
            <div className="profile-container">
                
                <div className="profile-picture">
                    <div className="circle"> <img src={loggedUser.profile_picture}/></div>
                    
                </div>

                <div className="upload-avatar">
                    <label for="avatar" id="upload-avatar-label"> <AddAPhotoIcon/> Chose an Avatar </label>
                    <input type="file" accept="image/*" id="avatar" onChange={(e)=> setAvatar(e.target.files[0])} />
                    <button onClick={uploadAvatar} > Upload Avatar</button>
                </div>
                    
                <div className="user-info">
                    <div className="credentials-upload">
                        <h4> Username:</h4> <input  onChange={(e)=> setUsername(e.target.value)} />
                    </div>
                    <div className="credentials-upload">
                        <h5> Description:</h5> <input onChange={(e)=> setDescription(e.target.value)} />
                    </div>
                    <button onClick={handleUploadCredentials} > Upload changes </button>
                    
                </div>

                <div className="user-info">
                    <div className="credentials-upload">
                        <h4> New Password:</h4> <input type="password" onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <div className="credentials-upload">
                        <h5> Confirm Password:</h5> <input type="password" onChange={(e)=> setVerifyPassword(e.target.value)} />
                    </div>
                    <button onClick={handleUploadPassword} > Upload Password </button>
                    
                </div>
                
                <div className="user-photos" id="edit-photos" >
                    <div className="photos-container">
                    {loggedUserPhotos.map(photo=>(
                        <div className="single-photo"> 
                            <img src={photo.photo_link} />
                            <div className="delete-icon">
                                <DeleteIcon style={{fontSize:"40px"}} onClick={()=> handleDelete(photo.id)}  />    
                            </div>
                            
                         </div>
                    ))}
                    </div>
                        <div className="upload-images">
                        <label for="user-photos" className="upload-images" > <AddAPhotoIcon/> Choose Photos to upload </label>
                        <input type="file" accept="image/*" multiple placeholder="add new photos" id="user-photos" onChange={(e)=> setImage(e.target.files[0])} />
                        <button onClick={uploadImages} > Upload Photos </button>
                        </div>

                        
                </div>
            </div>
        </div>
    )
}