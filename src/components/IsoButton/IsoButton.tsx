import styled from "styled-components";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export type IsoButtonProps = {
  type: "instagram" | "twitter" | "linkedin" | "github";
  href: string;
  title?: string;
};

const buttonSize = 80;

const layerBottom = "#ea6153";
const layerMiddle = "#27ae60";

const colors: Record<IsoButtonProps["type"], string> = {
  linkedin: "#3b5998",
  twitter: "#55acee",
  instagram: "#e746a7ff",
  github: "#666666",
};

const Wrapper = styled.div`
  transform-style: preserve-3d;
  perspective: 1500px;
  perspective-origin: 50% 50%;
  margin: 40px auto;
  text-align: center;
  transform: rotateX(60deg) rotateZ(45deg);
`;

const Button = styled.a<{ $bg: string }>`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  margin: 4px;
  position: relative;
  display: inline-block;
  perspective: 100px;
  cursor: pointer;
  text-decoration: none;

  &::before,
  &::after,
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.35s ease-in-out;
    transform: translate(0, 0) translateZ(0); /* 기본 transform 값 지정 */
  }

  &::before {
    background-color: ${layerBottom};
    content: "";
  }

  &::after {
    background-color: ${layerMiddle};
    z-index: 0;
    content: "";
  }

  &:hover {
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.4);

    div {
      transform: translate(-30px, -30px) translateZ(10px);
    }

    &::after {
      transform: translate(-15px, -15px) translateZ(5px);
    }
  }

  div {
    background-color: ${(props) => props.$bg};
    z-index: 1;
    color: #fff;
    text-align: center;

    svg {
      font-size: ${buttonSize / 2}px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export function IsoButton({ type, href, title }: IsoButtonProps) {
  const Icon =
    type === "linkedin"
      ? FaLinkedin
      : type === "twitter"
      ? BsTwitterX
      : type === "instagram"
      ? FaInstagram
      : FaGithub;

  const label = title ?? `${type} link`;
  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      $bg={colors[type]}
    >
      <div>
        <Icon />
      </div>
    </Button>
  );
}

export function IsoButtonGroup() {
  return (
    <Wrapper>
      <IsoButton
        type="linkedin"
        href="https://linkedin.com/in/huiung-kim-3b1330244"
        title="LinkedIn"
      />
      <IsoButton
        type="twitter"
        href="https://x.com/HankKimDev"
        title="Twitter"
      />
      <br />
      <IsoButton
        type="instagram"
        href="https://www.instagram.com/huiung1/"
        title="Instagram"
      />
      <IsoButton
        type="github"
        href="https://github.com/hank1245"
        title="GitHub"
      />
    </Wrapper>
  );
}

export default IsoButton;
