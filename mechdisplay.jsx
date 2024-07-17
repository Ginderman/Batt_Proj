export default function MechDisplay ({mech}) {

 


    return (
        <>
            <img src={mech.Image}/>
            <p>{mech.Name}</p>
            <p>{mech.Mass}</p>
            <p>{mech.Structure}</p>
            <p>{mech.MCost}</p>
           
        </>
        

    )


}