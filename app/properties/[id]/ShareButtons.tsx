import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  XIcon,
  LineIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share'
import DBPropertyListing from '@/interfaces/DBPropertyListing'

type Props = {
  property: DBPropertyListing
}

export default function ShareButtons({ property }: Props) {
  const share_url = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={share_url}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={30} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={share_url}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
        >
          <XIcon size={30} round />
        </TwitterShareButton>

        <LineShareButton
          url={share_url}
          title={`Check out this ${property.type} for rent`}
        >
          <LineIcon size={30} round />
        </LineShareButton>

        <WhatsappShareButton
          url={share_url}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={30} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={share_url}
          subject={property.name}
          body={`Check out this property listing: ${share_url}`}
        >
          <EmailIcon size={30} round />
        </EmailShareButton>
      </div>
    </>
  )
}
