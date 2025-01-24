import Menu from "@/components/Menu/Menu"
import { getAllCompanies } from "@/services/companyApi"

export async function generateMetadata(params) {
    const paramEncoded = `?company=${params.params.company}`
    const urlParams = new URLSearchParams(paramEncoded)
    const company = urlParams.get("company")
    let url
    try {
        let [ companyData ] = await getAllCompanies({ name: company }) 
        url = companyData.url  
    } catch(error) {
        url = ""
    }
    const metadataObject = {
        title: company,
        description: `Rows Ecommerce showing the products of the ${company} company`,
    }
    if (url) {
        metadataObject.icons = {
            icon: {
                url,
                href: url
            }
        }
    }
    return metadataObject
}

export default function CompanyHomePage({ params }) {
    return (
        <Menu params={params} />
    )
}