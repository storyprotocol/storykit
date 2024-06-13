import { camelize } from "../utils"

export function convertLicenseTermObject(licenseTerms: any) {
    console.log(licenseTerms)
    return licenseTerms.reduce((acc: any, option: any) => {
        return {
          ...acc,
          [camelize(option.trait_type)]:
            option.value === "true" ? true : option.value === "false" ? false : option.value,
        }
      }, {})
}