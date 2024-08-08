import React from 'react'
interface FeatureProps {
    bgColor: string,
    textColor:string,
    feature: string,
    shadowColor: string
}
const FeaturesCard:React.FC<FeatureProps> = ({bgColor, textColor, feature, shadowColor}) => {
  return (
    <div className={`${bgColor} rounded-md w-fit px-5 py-5 hover:${shadowColor} transition-all ease-in-out`}>
       <h5 className={`font-Grosteque ${textColor} font-medium hover:font-bold`}>{feature}</h5>
    </div>
  )
}

export default FeaturesCard