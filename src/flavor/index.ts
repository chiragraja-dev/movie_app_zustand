import { DevelopmentFlavor } from './development.flavor';

function flavor() {
    if (process.env.NEXT_PUBLIC_API_ENV === "development") {
        return DevelopmentFlavor
    }
}
export default flavor